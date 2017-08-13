import { Component, OnInit } from '@angular/core';
import { ProductService } from './services/products.service';
import { Product } from './Product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ProductService]
})

export class AppComponent implements OnInit {
  title = 'Bill App';

  dairyProducts: Product[];
  bakeryProducts: Product[];
  fruitVegProducts: Product[];
  meatsProducts: Product[];

  errorMessage: string;

  listProducts: Product[];
  tempProduct: Product;

  totalBill: number;

  constructor(private _productService: ProductService) {
    this.dairyProducts = [];
    this.bakeryProducts = [];
    this.fruitVegProducts = [];
    this.meatsProducts = [];
    this.listProducts = [];
  }

  getSelected(sel_prod: string, sel_cat: string, quant: number) {
    switch (sel_cat) {
      case "Dairy": {
        this.tempProduct = this.dairyProducts.filter(x => x.name == sel_prod)[0];
        break;
      }
      case "Bakery": {
        this.tempProduct = this.bakeryProducts.filter(x => x.name == sel_prod)[0];
        break;
      }
      case "Fruit & Vegetables": {
        this.tempProduct = this.fruitVegProducts.filter(x => x.name == sel_prod)[0];
        break;
      }
      case "Meats": {
        this.tempProduct = this.meatsProducts.filter(x => x.name == sel_prod)[0];
        break;
      }
      default: {
        console.log("no match");
        break;
      }
    }

    if (this.listProducts.some(x => x.name == sel_prod)) {
      this.tempProduct = this.listProducts.filter(x => x.name == sel_prod)[0];
      let index = this.listProducts.indexOf(this.tempProduct);
      this.tempProduct.quantity = +this.tempProduct.quantity + +quant;
      this.tempProduct.total = +this.tempProduct.quantity * this.tempProduct.price;
      this.listProducts[index] = this.tempProduct;
    }
    else {
      this.tempProduct.quantity = quant;
      this.tempProduct.total = +this.tempProduct.quantity * this.tempProduct.price;
      this.listProducts.push(this.tempProduct);
    }
  }

  removeProduct(prod_cat: string, prod_name: string){
    let productToRemove: Product;
    switch (prod_cat) {
      case "Dairy": {
        productToRemove = this.dairyProducts.filter(x => x.name == prod_name)[0];
        break;
      }
      case "Bakery": {
        productToRemove = this.bakeryProducts.filter(x => x.name == prod_name)[0];
        break;
      }
      case "Fruit & Vegetables": {
        productToRemove = this.fruitVegProducts.filter(x => x.name == prod_name)[0];
        break;
      }
      case "Meats": {
        productToRemove = this.meatsProducts.filter(x => x.name == prod_name)[0];
        break;
      }
      default: {
        console.log("no match");
        break;
      }
    }
    let index: number = this.listProducts.indexOf(productToRemove);
    if (index !== -1) {
        this.listProducts.splice(index, 1);
    } 
  }

  calculateBill(): void{
    this.totalBill = 0;
    let tempTotal: number;
    this.listProducts.forEach((item, index) => {
      tempTotal = +item.quantity * +item.price;
      console.log(tempTotal);
      this.totalBill = this.totalBill + tempTotal;
      console.log(this.totalBill);
    });
  }

  ngOnInit(): void {
    console.clear();
    let self = this;
    self._productService.getProducts("dairy.json").subscribe(response => this.dairyProducts = response, error => this.errorMessage = <any>error);
    self._productService.getProducts("bakery.json").subscribe(response => this.bakeryProducts = response, error => this.errorMessage = <any>error);
    self._productService.getProducts("fruit_veg.json").subscribe(response => this.fruitVegProducts = response, error => this.errorMessage = <any>error);
    self._productService.getProducts("meats.json").subscribe(response => this.meatsProducts = response, error => this.errorMessage = <any>error);
  }
}