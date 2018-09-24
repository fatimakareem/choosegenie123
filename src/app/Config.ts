import {Injectable} from '@angular/core';

@Injectable()
export class Config {//https://apis.choicegenie.com/choice/
    //public static api: String = 'https://apis.choicegenie.com/choice/';

<<<<<<< HEAD
public static api: String = 'https://apis.choicegenie.com/';
// public static api: String = 'http://192.168.30.164:8000';
=======
// public static api: String = 'https://apis.choicegenie.com/';
public static api: String = 'http://192.168.30.164:8000/';
>>>>>>> 5c6dcb6fb75a127f0c6773f608f6291cc062dd54

//   public static api: String = 'http://192.168.30.238:9000/';


   public static Imageurl: string = 'https://storage.choicegenie.com/media/'; 
    public  static  Imageurlget = 'https://storage.choicegenie.com/images/';  
   public  static  Imageurlupload = 'https://storage.choicegenie.com/upload_image.php';
}