import {Injectable} from '@angular/core';

@Injectable()
export class Config {//https://apis.choicegenie.com/choice/
    //public static api: String = 'https://apis.choicegenie.com/choice/';
<<<<<<< HEAD
 //public static api: String = 'https://apis.choicegenie.com/';
 public static api: String = 'http://192.168.29.239:9000/';
=======
//  public static api: String = 'https://apis.choicegenie.com/';
 public static api: String = 'http://192.168.30.119:9000/';
>>>>>>> efa471822c0e635d0f1cbd2861c9aca8573b0604
   public static Imageurl: string = 'https://storage.choicegenie.com/media/'; 
    public  static  Imageurlget = 'https://storage.choicegenie.com/images/';  
   public  static  Imageurlupload = 'https://storage.choicegenie.com/upload_image.php';
}