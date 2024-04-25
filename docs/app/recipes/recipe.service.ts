import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";
@Injectable()
export class RecipeService {
    recipeChanged = new Subject<Recipe[]>();
    // private recipes: Recipe[] = [
    //     new Recipe('Khaman/Dhokala',
    //                'Very delicious gujrati recipe', 
    //                'https://static.toiimg.com/photo/61915645.cms',
    //                [new Ingredient('ground flour', 2), 
    //                 new Ingredient('backing soda', 1)]),
    //     new Recipe('Thepla',
    //                'Very delicious gujrati recipe', 
    //                'https://www.jcookingodyssey.com/wp-content/uploads/2023/05/methi-thepla.jpg.webp',
    //                [new Ingredient('wheat flour', 2), 
    //                new Ingredient('fenugreek leaves', 1)])
    //   ];

      private recipes: Recipe[] = [];

      constructor(private slService: ShoppingListService) {}

      setRecipes(recipe: Recipe[]) {
        this.recipes = recipe;
        this.recipeChanged.next(this.recipes.slice());
      }

      getRecipe() {
        return this.recipes.slice(); // slice returns copy of the recipes arr.
      }

      getRecip(index: number) {
        return this.recipes[index];
      }

      addIngredientsToSL(ingredient: Ingredient[]) {
        this.slService.addIngredient(ingredient);
      }

      addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice());
      }

      updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipeChanged.next(this.recipes.slice());
      }

      deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipeChanged.next(this.recipes.slice());
      }
}