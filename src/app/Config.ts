import {Injectable} from '@angular/core';

@Injectable()
export class Config {//https://apis.choicegenie.com/choice/
    //public static api: String = 'https://apis.choicegenie.com/choice/';
<<<<<<< HEAD
 //public static api: String = 'https://apis.choicegenie.com/';
=======
// public static api: String = 'https://apis.choicegenie.com/';
>>>>>>> c85048e4e401cf7bcd0f5be5e9ab349b073d2a8d
 public static api: String = 'http://192.168.29.122:9000/';
   public static Imageurl: string = 'https://storage.choicegenie.com/media/'; 
    public  static  Imageurlget = 'https://storage.choicegenie.com/images/';  
   public  static  Imageurlupload = 'https://storage.choicegenie.com/upload_image.php';
}