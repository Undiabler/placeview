<?php

use Phalcon\Mvc\Model,
	Phalcon\Db\Column,
    Phalcon\Mvc\Model\MetaData;

class Offers extends Model
{

	public $id;

	public $name;

	public $url;

	public $good;
	
	public $total;

	// public function metaData()
 //    {
 //        return array(

 //            // Каждый столбец в отображаемой таблице
 //            MetaData::MODELS_ATTRIBUTES => array(
 //                'id', 'name', 'url', 'good', 'total'
 //            ),

 //            // Каждый столбец частью первичного ключа
 //            MetaData::MODELS_PRIMARY_KEY => array(
 //                'id'
 //            ),

 //            // Каждый столбец, который не является частью первичного ключа
 //            MetaData::MODELS_NON_PRIMARY_KEY => array(
 //                'name', 'url', 'good', 'total'
 //            ),

 //            // Каждый столбец, который не позволяет нулевые значения
 //            MetaData::MODELS_NOT_NULL => array(
 //                'name', 'url'
 //            ),

 //            // Каждый столбец и их типы данных
 //            MetaData::MODELS_DATA_TYPES => array(
 //                'id' => Column::TYPE_INTEGER,
 //                'name' => Column::TYPE_VARCHAR,
 //                'url' => Column::TYPE_VARCHAR,
 //                'good' => Column::TYPE_INTEGER,
 //                'total' => Column::TYPE_INTEGER
 //            ),

 //            // Колонки, которые имеют числовые типы данных
 //            MetaData::MODELS_DATA_TYPES_NUMERIC => array(
 //                'id' => true,
 //                'good' => true,
 //                'total' => true,
 //            ),

 //            // Столбец идентификаторов, используйте логическое значение FALSE, если модель не имеет
 //            // столбец идентификации
 //            MetaData::MODELS_IDENTITY_COLUMN => 'id',

 //            // Как каждый столбец должен быть связан/слит
 //            // MetaData::MODELS_DATA_TYPES_BIND => array(
 //            //     'id' => Column::BIND_PARAM_INT,
 //            // ),

 //            //Поля, которые должны быть проигнорированы в INSERT SQL инструкциях
 //            MetaData::MODELS_AUTOMATIC_DEFAULT_INSERT => array(
 //                'id' => true,
 //                'good' => true, 
 //                'total'=> true
 //            ),

 //            //Поля, которые должны быть проигнорированы в UPDATE SQL инструкциях
 //            MetaData::MODELS_AUTOMATIC_DEFAULT_UPDATE => array(
 //                'id' => true,
 //            )

 //        );
 //    }



}
