<?php

use Phalcon\Mvc\User\Component;
use Phalcon\Logger,
    Phalcon\Events\Manager as EventsManager,
    Phalcon\Logger\Adapter\File as FileLogger;

class Actions extends Component
{

	function get_hotspots($pano_id,$lang = 'en'){
		$langs = "'$lang','".implode("','",$this->config->langs->toArray())."'";
		$hotspots = $this->extra->getSql("SELECT * from hotspots_lang WHERE pano_id = ?  GROUP BY hostpot_id ORDER BY FIELD(lang, $langs)",[$pano_id]);
		return $hotspots;
	}


}