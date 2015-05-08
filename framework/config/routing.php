<?php  

$router = new \Phalcon\Mvc\Router(false);

    $router->setDefaultController('index');
    $router->setDefaultAction('index');

	$router->add(
	    "/",
	    [	"controller" => "index", "action" => "index", ]
	);

	$router->add(
	    "/:action",
	    [	"controller" => "index", "action" => 1, ]
	);
	
	$router->add(
	    "/task/:action",
	    [	"controller" => "task", "action" => 1, ]
	);

	$router->add(
	    "/sphere/:action",
	    [	"controller" => "sphere", "action" => 1, ]
	);

	$router->add(
	    "/tools/:action",
	    [	"controller" => "tools", "action" => 1, ]
	);


	$router->add(
	    "/logout",
	    [	"controller" => "login", "action" => "logout", ]
	);

	$router->add(
	    "/register",
	    [	"controller" => "login", "action" => "register", ]
	);

	$router->add(
	    "/planing",
	    [	"controller" => "index", "action" => "planing", ]
	)->setName('planing');

	$router->add(
	    "/focus",
	    [	"controller" => "index", "action" => "focus", ]
	)->setName('focus');

	$router->add(
	    "/cron",
	    [	"controller" => "index", "action" => "cron", ]
	);

	$router->add(
	    "/adminpanel",
	    [	"controller" => "adminpanel", "action" => "index", ]
	);

		$router->add(
	    "/adminpanel/:action",
	    [	"controller" => "adminpanel",   "action"     => 1, ]
	);

	$router->add("/auth/:action",
	    array(
	        "controller" => "auth",
	        "action"     => 1,
	    )
	);


	// $router->add(
	//     "/campaign/edit/{id:[0-9]+}",
	//     [	"controller" => "camps", "action" => "edit", ]
	// )->setName('camp-edit');


	$router->notFound(array(
	    "controller" => "errors",
	    "action" => "route404"
	));


	return $router;