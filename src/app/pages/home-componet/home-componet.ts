import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../components/navbar-component/navbar-component';
import { FooterComponent } from '../../components/footer-component/footer-component';

@Component({
  selector: 'app-home-componet',
  imports: [RouterLink, NavbarComponent, FooterComponent],
  templateUrl: './home-componet.html',
  styleUrl: './home-componet.css'
})
export class HomeComponet {

}
