<?php

use Phalcon\Mvc\Controller;
use Phalcon\Mvc\View;

class CopyrightController extends CController
{

	public function initialize() {

	}

	private function update($to){
		if ($id = $this->request->getPost('tour_id')) {
			$name = $this->request->getPost('name_to');
			$description = $this->request->getPost('description_to',null,'');
			$contacts = $this->request->getPost('contacts_to',null,'');
			$this->db->execute("INSERT INTO tours_lang(id,name,description,contacts,lang) VALUES (?,?,?,?,?)",[$id,$name,$description,$contacts,$to]);
		}
	}

	public function translateAction() {
		
		$from = $this->request->getQuery('from');
		$to   = $this->request->getQuery('to'  );


		if ($this->request->isPost()) {
			$this->update($to);
			$url = $this->extra->urlBuild();
			$this->response->redirect(substr($url,1));
		}


		if ($from&&$to){

			$this->view->setVar('lang_from'	,$from);
			$this->view->setVar('lang_to'	,$to);

			$type = $this->request->getQuery('type',null,'tour');
			
			switch ($type) {

				case 'tour':
					$this->tour($from,$to);
					break;
				
				case 'pano':
					$this->pano($from,$to);
					break;
			}

		} else {
			$this->view->pick('copyright/lang');
		} 
	}

	private function pano() {

		$this->view->pick('copyright/pano');

	}

	private function tour($from,$to) {

		$to_translate = $this->extra->getSql("SELECT t1.* FROM tours_lang as t1 LEFT JOIN tours_lang as t2 ON t1.id=t2.id AND t2.lang = '$to' WHERE t1.lang = '$from' AND t2.lang IS NULL ORDER BY RAND() LIMIT 1",[],true);
		
		// TODO:если переводить нечего
		$this->view->setVar('tour_id',	$to_translate['id']);

		$this->view->setVar('name_from',	$to_translate['name']);
		$this->view->setVar('description_from',	$to_translate['description']);
		$this->view->setVar('contacts_from',	$to_translate['contacts']);

		// var_dump($to_translate);
		// exit;
		$this->tag->setDefault('name_from',	$to_translate['name']);
		$this->tag->setDefault('description_from',	$to_translate['description']);
		$this->tag->setDefault('contacts_from',	$to_translate['contacts']);

		$this->view->pick('copyright/tour');
	}

}
