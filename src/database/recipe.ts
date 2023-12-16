import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import {RecipeIngredient} from './recipeIngredient';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  difficulty: number;

  @Column()
  servings: number;

  @Column()
  preparationTime: number;

  @Column()
  preparation: string;

  @OneToMany(() => RecipeIngredient, rI => rI.recipe)
  ingredients: RecipeIngredient[];
}
