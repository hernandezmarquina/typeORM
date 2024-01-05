import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import {RecipeIngredient} from './recipeIngredient';

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  unit: string;

  @OneToMany(() => RecipeIngredient, rI => rI.ingredient)
  recipes: RecipeIngredient[];
}
