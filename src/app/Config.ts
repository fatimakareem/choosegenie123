import {Injectable} from '@angular/core';

@Injectable()
export class Config {//https://apis.choicegenie.com/choice/
    //public static api: String = 'https://apis.choicegenie.com/choice/';
public static api: String = 'https://apis.choicegenie.com/';
<<<<<<< HEAD
//   public static api: String = 'http://192.168.30.237:9000/';
=======
//   public static api: String = 'http://192.168.30.238:9000/';
>>>>>>> 0a2647ee77950b11dea615ce173efc9be621fe0f
   public static Imageurl: string = 'https://storage.choicegenie.com/media/'; 
    public  static  Imageurlget = 'https://storage.choicegenie.com/images/';  
   public  static  Imageurlupload = 'https://storage.choicegenie.com/upload_image.php';
}