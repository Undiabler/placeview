<?php

use Phalcon\Mvc\Controller;
use Phalcon\Mvc\View;

class IndexController extends Controller
{

	public function initialize()
	{
	   
	}

	public function photographersAction(){

	}

	public function planingAction(){
	  // $this->view->setVar('days',$this->getTasks());
		$this->view->setVar('days',[]);
	}

	public function indexAction()
	{
		
	}

	public function feedAction()
	{

	
		
	}

}
