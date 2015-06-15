<?php

use Phalcon\Mvc\Controller;
use Phalcon\Mvc\View;

class PlaceController extends CController
{

	public function initialize() {
		$this->view->disableLevel(array(
            // View::LEVEL_LAYOUT => false,
            View::LEVEL_MAIN_LAYOUT => false
        ));
	}

	public function viewAction(){
		$tour_url = $this->dispatcher->getParam("url1");
		$pano_url = $this->dispatcher->getParam("url2");

		if ($tour_url)
			var_dump($tour_url);

		if ($pano_url)
			var_dump($pano_url);
			
		$tour = $this->extra->getSql("SELECT * FROM tours_main WHERE url = ?",[$tour_url],true);
		var_dump($tour);

		if (!$tour) {
			$this->dispatcher->forward(['controller' => 'error','action' => 'error404']);
			return false;
		}

		if ($pano_url) {
			$pano = $this->extra->getSql("SELECT * FROM pano_main WHERE url = ?",[$pano_url],true);
			if (!$pano) {
				$this->response->redirect($this->config->lang."/place/$tour_url");
				return false;
			}
		} else {
			$pano = $this->extra->getSql("SELECT * FROM pano_main WHERE tour_id = ? ORDER BY sort LIMIT 1",[$tour['id']],true);
		}

		$langs = "'".$this->config->lang."','".implode("','",$this->config->langs->toArray())."'";
		$all_panos = $this->extra->getSql("SELECT * FROM pano_main LEFT JOIN (
				SELECT * FROM pano_lang
				GROUP BY id
				ORDER BY FIELD(lang, $langs) 
			) AS pano_lang ON pano_lang.id = pano_main.id WHERE tour_id = ? ORDER BY sort",[$tour['id']]);
		// echo('<pre>');
		// var_dump($all_panos);
		// exit();


		$this->view->setVar('all_panos',$all_panos);
		$this->view->setVar('tour_id',$tour['id']);
		$this->view->setVar('pano_id',$pano['id']);
		$this->view->pick("index/player");
		// $this->dispatcher->getParam("url1");
	}


}