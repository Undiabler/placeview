<?php

use Phalcon\Mvc\Controller;
use Phalcon\Mvc\View;

class CopyrightController extends CController
{

	public function initialize() {

	}

	public function translateAction() {
		// exit();
		
		$from = $this->request->getQuery('from');
		$to   = $this->request->getQuery('to'  );

		if ($from&&$to){

			$type = $this->request->getQuery('type',null,'tour');
			
			switch ($type) {

				case 'tour':
					$this->tour();
					break;
				
				case 'pano':
					$this->pano();
					break;
			}

		} else {

			$this->view->pick('copyright/lang');
		} 
	}

	private function pano() {


		$this->view->pick('copyright/pano');

	}

	private function tour() {
	
		$this->view->pick('copyright/tour');
	}

}
