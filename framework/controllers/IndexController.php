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
		
		$tours = $this->extra->getSql('SELECT * from tours_main INNER JOIN tours_lang ON tours_lang.id = tours_main.id AND lang = ? ORDER BY tours_main.id DESC LIMIT 20 ',[$this->config->lang]);
		
		$tours_arr = [0=>[],1=>[],2=>[]];

		$i=0;
		foreach ($tours as $key => $value) {
			$tours_arr[$i%3][]=$value;
			$i++;
		}

		$this->view->setVar('tours_array',$tours_arr);	
	}

	public function mapAction() {
		
	}

}
