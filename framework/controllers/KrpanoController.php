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

		$panos = $this->extra->getSql("SELECT * from pano_main WHERE tour_id = ? ",[$tour_id]);
		$pano_ids = [];
		$pano_all = [];
		foreach ($panos as $key => $pano) {
			$pano_all[$pano['id']]=$pano;
			$pano_all[$pano['id']]['hotspots']=[];
			$pano_ids[]=$pano['id'];
		}

		$ids = implode(',',$pano_ids);
		$hotspots = $this->extra->getSql("SELECT * from pano_hotspots WHERE pano_id IN ($ids)");

		$hotspots_all=[];
		foreach ($hotspots as $key => $hotspot) {
			$pano_all[$hotspot['pano_id']]['hotspots'][]=$hotspot;
		}
		$mpano = null;
		foreach ($panos as $one) {
			if ($one['id']==$pano_id) $mpano=$one;
		}
		// var_dump($mpano);
		// exit();

		// $this->view->setVar('hotspots',$hotspots);

		$this->view->setVar('pano',$mpano);
		$this->view->setVar('panos',$pano_all);

		$this->view->setVar('tour_id',$tour_id);
		$this->view->setVar('pano_id',$pano_id);

	}


}