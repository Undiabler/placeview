<?php
use Phalcon\Mvc\Controller;

class ErrorsController extends Controller
{

	public function show404Action()
	{
		echo('404');
	}
	public function show401Action()
	{
		if ($this->session->get('auth'))
			echo('401');
		else
			$this->response->redirect('login');
	}
	public function show500Action()
	{
		echo('500');
	}

}
