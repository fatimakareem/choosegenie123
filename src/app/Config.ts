import {Injectable} from '@angular/core';

@Injectable()
export class Config {//https://apis.choicegenie.com/choice/
    //public static api: String = 'https://apis.choicegenie.com/choice/';

public static api: String = 'https://apis.choicegenie.com/';
<<<<<<< HEAD
// public static api: String = 'http://192.168.30.164:9000/';
=======
// public static api: String = 'http://192.168.30.238:9000/';
>>>>>>> e2b7c1f211b32df5f12beaf3f379a6b1bfc3956b

//   public static api: String = 'http://192.168.30.238:9000/';


   public static Imageurl: string = 'https://storage.choicegenie.com/media/'; 
    public  static  Imageurlget = 'https://storage.choicegenie.com/images/';  
   public  static  Imageurlupload = 'https://storage.choicegenie.com/upload_image.php';
}