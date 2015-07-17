<?php

use Phalcon\Mvc\User\Component;
use Phalcon\Logger,
    Phalcon\Events\Manager as EventsManager,
    Phalcon\Logger\Adapter\File as FileLogger,
    Phalcon\Mvc\View as View;

class Html extends Component
{

	function render_hotspots($hotspots){

			$viewnew = new Phalcon\Mvc\View();
			$viewnew->disableLevel(array(
		        View::LEVEL_LAYOUT => false,
		        View::LEVEL_MAIN_LAYOUT => false
		    ));
            $viewnew->setViewsDir(__DIR__ . '/../views/');

            return $viewnew->getRender('widgets/block', 'container', array('hotspots' => $hotspots));
	}




}