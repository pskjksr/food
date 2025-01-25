import { NextResponse } from 'next/server';
import { getRecipeById, updateRecipe, deleteRecipe } from '../../services/recipeService';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const recipeId = parseInt(params.id);
  try {
    const recipe = await getRecipeById(recipeId);
    if (!recipe) {
      return NextResponse.json({ message: 'Recipe not found' }, { status: 404 });
    }
    return NextResponse.json(recipe);
  } catch (error) {
    return NextResponse.error();
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const recipeId = parseInt(params.id);
  const data = await req.json();
  try {
    const updatedRecipe = await updateRecipe(recipeId, data);
    return NextResponse.json(updatedRecipe);
  } catch (error) {
    return NextResponse.error();
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const recipeId = parseInt(params.id);
  try {
    await deleteRecipe(recipeId);
    return NextResponse.json({ message: 'Recipe deleted' });
  } catch (error) {
    return NextResponse.error();
  }
}
