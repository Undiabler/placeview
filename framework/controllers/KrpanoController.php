<?php

use Phalcon\Mvc\Controller;
use Phalcon\Mvc\View;

class KrpanoController extends Controller
{	

	public function initialize() {
		$this->view->disableLevel(array(
            View::LEVEL_LAYOUT => false,
            View::LEVEL_MAIN_LAYOUT => false
        ));
	}

	public function tourAction(){
		header("Content-type: text/xml");

		$tour_id = $this->dispatcher->getParam('tour_id');
		$pano_id = $this->dispatcher->getParam('pano_id');

		$this->view->setVar('tour_id',$tour_id);
		$this->view->setVar('pano_id',$pano_id);

	}


}