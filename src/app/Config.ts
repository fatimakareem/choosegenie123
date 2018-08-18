import {Injectable} from '@angular/core';

@Injectable()
export class Config {//https://apis.choicegenie.com/choice/
    //public static api: String = 'https://apis.choicegenie.com/choice/';
// public static api: String = 'https://apis.choicegenie.com/';
<<<<<<< HEAD
  public static api: String = 'http://192.168.30.238:9000/';
=======
public static api: String = 'http://192.168.30.238:7000/';
>>>>>>> 5a5660a6bcddf2011429f6ac50e3a11b135c9877
   public static Imageurl: string = 'https://storage.choicegenie.com/media/'; 
    public  static  Imageurlget = 'https://storage.choicegenie.com/images/';  
   public  static  Imageurlupload = 'https://storage.choicegenie.com/upload_image.php';
}