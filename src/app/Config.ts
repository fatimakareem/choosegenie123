import {Injectable} from '@angular/core';

@Injectable()
export class Config {//https://apis.choicegenie.com/choice/
    //public static api: String = 'https://apis.choicegenie.com/choice/';
<<<<<<< HEAD
 //public static api: String = 'https://apis.choicegenie.com/';
 public static api: String = 'http://192.168.30.119:9000/';
=======
//  public static api: String = 'https://apis.choicegenie.com/';
 public static api: String = 'http://192.168.30.237:9000/';
>>>>>>> 534b6818026bd685c7870f43a925628f3b7923dc
   public static Imageurl: string = 'https://storage.choicegenie.com/media/'; 
    public  static  Imageurlget = 'https://storage.choicegenie.com/images/';  
   public  static  Imageurlupload = 'https://storage.choicegenie.com/upload_image.php';
}