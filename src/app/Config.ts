import {Injectable} from '@angular/core';

@Injectable()
export class Config {//https://apis.choicegenie.com/choice/
    //public static api: String = 'https://apis.choicegenie.com/choice/';
public static api: String = 'https://apis.choicegenie.com/';
<<<<<<< HEAD
//    public static api: String = 'http://192.168.30.237:9000/';
=======
  // public static api: String = 'http://192.168.30.237:9000/';
>>>>>>> 6132cc669f0f11a7b6dec7f5c6ff1900f47e2cbc
   public static Imageurl: string = 'https://storage.choicegenie.com/media/'; 
    public  static  Imageurlget = 'https://storage.choicegenie.com/images/';  
   public  static  Imageurlupload = 'https://storage.choicegenie.com/upload_image.php';
}