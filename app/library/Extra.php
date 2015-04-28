<?php

use Phalcon\Mvc\User\Component;
use Phalcon\Logger,
    Phalcon\Events\Manager as EventsManager,
    Phalcon\Logger\Adapter\File as FileLogger;

class Extra extends Component
{
    private $loggers=[];

    private function log_construct($name){
        if (!array_key_exists($name, $this->loggers))
            $this->loggers[$name] = new FileLogger("app/logs/$name.log");
        return $this->loggers[$name];
    }
    public function log($message) {
        $this->log_construct('main')->log($message, Logger::INFO);
    }

    public function logEx($message,$name) {
        $this->log_construct($name)->log($message, Logger::INFO);
    }

    public function getCampsProps($id){
        $row=Props::findFirst(array(
            "conditions" => "id = ?1",
            "bind"       => array(1 => $id)
        ));
        if ($row) return $row->name;
        return "Неопределено";
    }

    public function cache($time=300){ //5 min
        
        $frontCache = new Phalcon\Cache\Frontend\Data(array( 'lifetime' => $time ));
        
        if (strstr($_SERVER["HTTP_HOST"], '.com')) {

            return new Phalcon\Cache\Backend\Apc($frontCache, array(
                'prefix' => 'app-data'
            ));
        
        } else {
        
            return new Phalcon\Cache\Backend\File($frontCache, array(
                "prefix" => 'cache',
                "cacheDir" => "app/cache/"
            ));
        }

    }


}