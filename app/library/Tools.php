<?php
/**
* 
*/
class Tools
{
	
	public static function parse_col($c,$type){

		$none='pc_n';
		$danger='pc_d';
		$warning='pc_w';
		$good='pc_g';
		$werygood='pc_g2';

		switch ($type) {

			case 'clicks':
			case 'views':
			 if ($c<50) return $none;
				break;

			case 'ps_lead':
			 if ($c>=80) return $good;
			 if ($c<60) return $danger;
			 if ($c<80) return $warning;
				break;
			
			case 'profit':
			 if ($c<0) return $danger;
			 if ($c>0) return $good;
				break;

			case 'ps_roi':
			case 'roi':
			 if ($c<0) return $danger;
			 if ($c>60) return $werygood;
			 if ($c>0) return $good;
				break;

		}

		return ''; 

	}
}