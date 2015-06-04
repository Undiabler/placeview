<?php

use Phalcon\Mvc\Controller;
use Phalcon\Mvc\View;

class IndexController extends CController
{

	use LoginTrait; #sign_in and sign_up

	public function initialize() {
		var_dump('index initialized');
	}

	public function photographersAction() {

		$c=$this->extra->getSql('SELECT * from user_main');
		// var_dump($c);
		// exit();

	}
	
	public function cabinetAction() {

	}
	public function playerAction() {
		$this->view->disableLevel(array(
            View::LEVEL_LAYOUT => false,
            View::LEVEL_MAIN_LAYOUT => false
        ));
	}

	public function not_foundAction() {
		$this->view->disableLevel(array(
            View::LEVEL_LAYOUT => false,
            View::LEVEL_MAIN_LAYOUT => false
        ));
	}

	public function planingAction() {
	  // $this->view->setVar('days',$this->getTasks());
		$this->view->setVar('days',[]);
	}

	public function indexAction() {
		exit();
	}

	public function feedAction() {
		
	}

	public function mapAction() {
		
	}

}
