BiciDB
======

The brains behind bikestorming


BiciDB es una base de datos, accesible mediante una API REST pública, que recolecta, almacena y  genera información a través del aporte de los Bikestormers mediante las redes sociales.


Diccionario de datos


Bikestormer

Un Bikestormer es el individuo que aporta datos, mediante una aplicación, a BiciDB. Su identidad esta definida mediante su perfil en las redes sociales a las cuales se conecta BiciDB.

La identidad de un Bikestormer se determina a partir de la asociación de su cuenta con una red social. El mismo no tiene que ingresar más información que la que decide compartir a través de ellas.


Location

Una location es un punto que el bikestormer ha marcado mediante BiciDB. Las mismas deben estar correctamente geolocalizadas. Para determinarlas correctamente, se hace uso de la información provista por la API de alguno de los providers.


Tip

Un Tip es una anotación que un bikestormer realizó sobre un location específico.

Provider

Un Provider es una fuente de datos para BiciDB (Por ejemplo, la API de Foursquare).


Implementación

BiciDB se encuentra desarrollado, principalmente, mediante Nodejs haciendo uso del framework Express y otras líbrerias de terceros.
Es capaz de comunicarse mediante otras aplicaciones únicamente a través de una API Rest pública.

La información generada es guardada en una base de datos relacional que hace uso del motor PostgreSQL e información no relacional en Mongodb.

Posee, internamente, tres modulos.

Api Rest pública: Usada por las aplicaciones externas que hacen uso de los datos generados o que generan datos para la misma.
Manejo de Proovedores: Encargados de recolectar la información necesaria de los distintos proveedores de los cuales se alimenta.
Controlador: Es el encargado de procesar la información provista por el usuario y/o recolectada de las redes sociales. La información que genera es almacenada en la base de datos.


Recursos de la API pública

/locations

GET

Devuelve una lista de venues cercanas a la pocisión explicitada mediante los parametros. Los mismos son  extraidos desde foursquare.

Parametros:
latitude <obligatorio>
longitude <obligatorio>

/bikechecks

GET

Devuelve una lista con los 10 últimos bikechecks. Si se le pasa los parametros correspondientes, la lista se filtra adecuadamente.

Parametros
latitude
longitude

/bikechecks/:user

GET

Devuelve una lista con los 10 últimos bikechecks que realizo el usuario especificado. Si no se especifica una credencial oauth, se devuelven únicamente los bikechecks públicos. De otra forma, se devuelven de acuerdo a las definiciones de privacidad.
