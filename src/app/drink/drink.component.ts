import { Component } from '@angular/core';
import { DrinkapiService } from '../shared/drinkapi.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TypeapiService } from '../shared/typeapi.service';

@Component({
  selector: 'app-drink',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './drink.component.html',
  styleUrl: './drink.component.css'
})
export class DrinkComponent {

  drinkForm!: any;
  drinks: any;
  types: any;
  addMode = true;

  constructor(
    private drinkApi: DrinkapiService,
    private typeApi: TypeapiService,
    private build: FormBuilder
  ){}

  ngOnInit() {
    this.getDrinks();
    this.getTypes();
    this.drinkForm = this.build.group({
      id: [''],
      drink: [''],
      amount: [''],
      price: [''],
      type: [''],
      package: ['']
    });
  }

  save() {
    console.log('Mentés...')
    this.drinkApi.createDrink$(this.drinkForm.value).subscribe({
      next: (result) => {
        console.log(result);
        this.drinkForm.reset();
        this.getDrinks();
      }
    });
  }

  getDrinks() {
    this.drinkApi.getDrinks$().subscribe({
      next: (result: any) => {
        console.log(result.data);
        this.drinks = result.data;
      },
      error: () => {}
    })
  }

  getTypes() {
    this.typeApi.getTypes$().subscribe({
      next: (result: any) => {
        // console.log(result.data)
        this.types = result.data;
      }
    });
  }
}
