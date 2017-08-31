import { Component, OnInit ,Output,Input,EventEmitter,ViewContainerRef} from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  /*
  Add event emitter
  * */
  @Output() userStatusUpdate = new EventEmitter();
  checkUserAvail : boolean = false;
  model : any = {};
  loading = false;
  error = '';
  buttonVisibility : boolean = false;
  constructor(private router: Router,private service:AuthenticationService,public toastr: ToastsManager,vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {

    this.service.logout();
  }
  /*
   Login user
   * */
  login(){
    this.buttonVisibility  = true;
    if(!this.service.login(this.model)){
      this.buttonVisibility = false;
      this.error = ' Invalid email or password';
      this.router.navigate(['/login']);
    }else{

      this.checkUserAvail = true;
      this.userStatusUpdate.emit(true);
      window.location.href = '/#/index';

    }


  }
}
