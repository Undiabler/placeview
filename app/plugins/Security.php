<?php

use Phalcon\Acl;
use Phalcon\Acl\Role;
use Phalcon\Acl\Resource;
use Phalcon\Events\Event;
use Phalcon\Mvc\User\Plugin;
use Phalcon\Mvc\Dispatcher;
use Phalcon\Acl\Adapter\Memory as AclList;

/**
 * SecurityPlugin
 *
 * This is the security plugin which controls that users only have access to the modules they're assigned to
 */
class Security extends Plugin
{

	private function likeRest($controller,$action){

		$likeRestResources = array(
				'svm'      	 => array('update','view','ip_test','redirect','remap','recalculate'),
		);

		// var_dump($controller);
		// var_dump($action);
		// in_array(needle, haystack)
		$b=( array_key_exists($controller,$likeRestResources) && ( in_array($action,$likeRestResources[$controller]) || in_array('*',$likeRestResources[$controller]) ) );

 		// var_dump($b);

		return $b;

	}

	/**
	 * Returns an existing or new access control list
	 *
	 * @returns AclList
	 */
	public function getAcl()
	{

		//throw new \Exception("something");

		if (!isset($this->persistent->acl)) {

			$acl = new AclList();

			$acl->setDefaultAction(Acl::DENY);

			//Register roles
			$roles = array(
				'users'  => new Role('Users'),
				'guests' => new Role('Guests')
			);
			foreach ($roles as $role) {
				$acl->addRole($role);
			}

			//Private area resources
			$privateResources = array(
				'camps'    => array('*'),
				'clients'  => array('*'),
				'filter'   => array('*'),
				'cpanel'   => array('*'),
				// 'svm'     => array('index', 'profile')
			);
			foreach ($privateResources as $resource => $actions) {
				$acl->addResource(new Resource($resource), $actions);
			}

			//Public area resources
			$publicResources = array(
				'index'      => array('*'),
				'svm'      	 => array('update','view','ip_test','redirect'),
				'register'   => array('index'),
				'errors'     => array('show404', 'show401', 'show500'),
				'session'    => array('index', 'register', 'start', 'end'),
				'contact'    => array('index', 'send')
			);
			foreach ($publicResources as $resource => $actions) {
				$acl->addResource(new Resource($resource), $actions);
			}

			//Grant access to public areas to both users and guests
			foreach ($roles as $role) {
				foreach ($publicResources as $resource => $actions) {
					foreach ($actions as $action){
						$acl->allow($role->getName(), $resource, $action);
					}
				}
			}

			//Grant acess to private area to role Users
			foreach ($privateResources as $resource => $actions) {
				foreach ($actions as $action){
					$acl->allow('Users', $resource, $action);
				}
			}

			//The acl is stored in session, APC would be useful here too
			$this->persistent->acl = $acl;
		
		}

		return $this->persistent->acl;
	}

	/**
	 * This action is executed before execute any action in the application
	 *
	 * @param Event $event
	 * @param Dispatcher $dispatcher
	 */
	public function beforeDispatch(Event $event, Dispatcher $dispatcher)
	{

		$controller = $dispatcher->getControllerName();
		$action = $dispatcher->getActionName();

		if ($this->likeRest($controller,$action)) return true;

		$auth = $this->session->get('auth');

		if (!$auth){
			$role = 'Guests';
		} else {
			$role = 'Users';
		}

		$acl = $this->getAcl();

		$allowed = $acl->isAllowed($role, $controller, $action);

		if ($allowed != Acl::ALLOW) {

			$dispatcher->forward(array(
				'controller' => 'errors',
				'action'     => 'show401'
			));

			return false;
		}
	}
}
