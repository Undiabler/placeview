<?php

	use Phalcon\Loader;
	use Phalcon\Tag;
	use Phalcon\Mvc\Url;
	use Phalcon\Mvc\View;
	use Phalcon\Mvc\Application;
	use Phalcon\DI\FactoryDefault;
	use Phalcon\Db\Adapter\Pdo\Mysql as DbAdapter;

	use Phalcon\Logger,
    Phalcon\Events\Manager as EventsManager,
    Phalcon\Logger\Adapter\File as FileLogger;

	if (!class_exists('Phalcon\Loader')) {
	    header('Location: /install.php');	
	    exit();
	}


try {

	// $debug = new Phalcon\Debug();
	// $debug->listen();

    // Register an autoloader
    $loader = new Loader();
    $loader->registerDirs(
        array(
            'app/controllers/',
            'app/plugins/',
            'app/library/',
            'app/models/'
        )
    )->register();

    // Create a DI
    $di = new FactoryDefault();


    // Set the database service
    $di['db'] = function() {
	    include_once('app/config/bd_config.php');
    	// var_dump($bd_config);
    	$db=new DbAdapter($bd_config);
		
		// $eventsManager = new EventsManager();

		// $logger = new FileLogger("app/logs/db.log");

		// // Слушаем все события БД
		// $eventsManager->attach('db', function($event, $connection) use ($logger) {
		//     if ($event->getType() == 'beforeQuery') {
		//         $logger->log($connection->getSQLStatement(), Logger::INFO);
		//         // var_dump($connection->getSQLStatement());
		//     }
		// });


		// $db->setEventsManager($eventsManager);
        
        return $db;
    };

    // echo('<pre>');
    // var_dump($_SERVER["HTTP_HOST"]);
    // exit();

    $di['modelsMetadata'] = function() {

	    // Создать менеджер мета-данных с APC
	    if (strstr($_SERVER["HTTP_HOST"], '1-tn.com')) {
	    	
		    $metaData = new \Phalcon\Mvc\Model\MetaData\Apc(array(
		        "lifetime" => 86400,
		        "prefix"   => "my-prefix"
		    ));

	    } else {
	   
	    	 $metaData = new \Phalcon\Mvc\Model\MetaData\Memory(array(
		        "lifetime" => 86400,
		        "prefix"   => "my-prefix"
		    ));

	    }

	    return $metaData;
	};

	$di['session'] = function(){
	    $session = new Phalcon\Session\Adapter\Files();
	    $session->start();
	    return $session;
	};

	$di->set('dispatcher', function() use ($di) {

	    $eventsManager = $di->getShared('eventsManager');
	    //Instantiate the Security plugin
	// создаем экземпляр плагина безопасности
	    $security = new Security($di);
	    //Listen for events produced in the dispatcher using the Security plugin
	// прослушка для событий созданных в диспетчере, используя плагин безопасности
	    $eventsManager->attach('dispatch', $security);

	    $dispatcher = new Phalcon\Mvc\Dispatcher();
	    //Bind the EventsManager to the Dispatcher
	// связываем EventsManager с Dispatcher
	    $dispatcher->setEventsManager($eventsManager);

	    return $dispatcher;
	});



   		

    // Setting up the view component
    $di['view'] = function() {
        $view = new View();
        $view->setViewsDir('app/views/');
        return $view;
    };

    // Setup a base URI so that all generated URIs include the "tutorial" folder
    $di['url'] = function() {
        $url = new Url();
        // $url->setBaseUri('/tutorial/');
        return $url;
    };

    $di['widget']= function(){
	    return new Widgets();
	};

	$di['extra']= function(){
	    return new Extra();
	};

    // Setup the tag helpers
    $di['tag'] = function() {
        return new Tag();
    };

    $di['flash']= function() {
    	 $flash = new \Phalcon\Flash\Session(array(
	        'error' => 'alert alert-danger',
	        'success' => 'alert alert-success',
	        'notice' => 'alert alert-info',
	    ));
	    return $flash;
	};

	$di->set('router', function() {

	    $router = new \Phalcon\Mvc\Router();

		// Определение правила маршрутизации
		$router->add(
		    "/",
		    array(
		        "controller" => "index",
		        "action"     => "index",
		    )
		);

		$router->add(
		    "/people",
		    array(
		        "controller" => "index",
		        "action"     => "people",
		    )
		);

		$router->add(
		    "/campain/{id:[0-9]+}",
		    array(
		        "controller" => "camps",
		        "action"     => "view",
		    )
		);

		$router->add(
		    "/rotate/{id:[0-9]+}",
		    [  "controller" => "svm", "action" => "redirect", ]
		);
		$router->add(
		    "/rotate/{debug:debug}/{id:[0-9]+}",
		    [  "controller" => "svm", "action" => "redirect", ]
		);

		$router->add(
		    "/login",
		    [  "controller" => "index", "action" => "login", ]
		);

		$router->notFound(array(
		    "controller" => "errors",
		    "action" => "route404"
		));


		return $router;

	});

    // Handle the request
    $application = new Application($di);

    echo $application->handle()->getContent();

} catch (Exception $e) {
     echo "Exception: ", $e->getMessage();
}
