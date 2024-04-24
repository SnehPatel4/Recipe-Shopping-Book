import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {
    ingredientChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();
    ingredients: Ingredient[] = [
        new Ingredient('apples', 5),
        new Ingredient('banana', 5)
      ];

    getIngredient() {
        return this.ingredients.slice();
    }

    getIngnt(index: number) {
        return this.ingredients[index];
    }

    addIngredients(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientChanged.next(this.ingredients.slice());
    }

    addIngredient(ingredient: Ingredient[]) {
        this.ingredients.push(...ingredient);
        this.ingredientChanged.next(this.ingredients.slice());
    }

    updateIngredient(index: number, newIngredient: Ingredient) {
        this.ingredients[index] = newIngredient;
        this.ingredientChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.ingredientChanged.next(this.ingredients.slice());
    }
}