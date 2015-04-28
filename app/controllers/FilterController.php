<?php

use Phalcon\Mvc\Controller;

class FilterController extends Controller
{

	public function indexAction()
	{
		  $id = $this->dispatcher->getParam("id");
		  
		  // var_dump($id);
		  // exit();
	}

}
