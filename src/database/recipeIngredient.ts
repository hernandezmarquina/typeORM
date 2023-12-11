import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Recipe} from './recipe';
import {Ingredient} from './ingredient';

@Entity()
export class RecipeIngredient {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Recipe, recipe => recipe.ingredients)
  recipe: Recipe;

  @ManyToOne(() => Ingredient, ingredient => ingredient.recipes)
  ingredient: Ingredient;

  @Column()
  amount: number;
}
