import { NgModule } from '@angular/core';
import { PreloadAllModules, PreloadingStrategy, RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule)},
  {path: 'shopping-list', loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule)},
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
];
// using this syntax : loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule) we implement lazy loading, in this we catch 'm' as module then extract RecipeModule
// since we load recipe component at /recipes route we have to remove RecipeModule from appModule file otherwise it gives error.

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule],
}) // 'preloadingStrategy' property will load all the module before the visit so we don't wait too long. also we load the only module we visit for perticular route.
export class AppRoutingModule {}








