<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TodoController extends Controller
{
    public function index(): JsonResponse
    {
        $user = Auth::user();

        $todos = $user->todos()->orderBy('isCompleted', 'asc')->orderBy('created_at' , 'desc')->get();

        return response()->json([
            'data' => $todos,
            'user' => $user
        ], 200);
    }

    public function store(Request $request): JsonResponse
    {
        $user = Auth::user();
        $request->validate([
            'item' => 'required|string|max:255',
        ]);

        $todo = $user->todos()->create([
            'item' => $request->item,
            'isCompleted' => false,
        ]);

        return response()->json($todo, 201);
    }

    public function update(Request $request, $id): JsonResponse
    {
        $user = Auth::user();
        $todo = $user->todos->find($id);

        $todo->update($request->all());

        return response()->json($todo, 200);
    }

    public function destroy($id): JsonResponse
    {
        $user = Auth::user();
        $user->todos->find($id)->delete();

        return response()->json(null, 204);
    }
}
