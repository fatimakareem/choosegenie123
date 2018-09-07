import {Injectable} from '@angular/core';

@Injectable()
export class Config {//https://apis.choicegenie.com/choice/
    //public static api: String = 'https://apis.choicegenie.com/choice/';

<<<<<<< HEAD
// public static api: String = 'https://apis.choicegenie.com/';
public static api: String = 'http://192.168.30.238:9000/';
=======
public static api: String = 'https://apis.choicegenie.com/';
// public static api: String = 'http://192.168.30.238:8000/';
>>>>>>> d09c0859b3a8c6aba9ab6eb710d273269b38f460

//   public static api: String = 'http://192.168.30.238:9000/';


   public static Imageurl: string = 'https://storage.choicegenie.com/media/'; 
    public  static  Imageurlget = 'https://storage.choicegenie.com/images/';  
   public  static  Imageurlupload = 'https://storage.choicegenie.com/upload_image.php';
}