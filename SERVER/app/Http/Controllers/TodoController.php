<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TodoController extends Controller
{

    public function index()
    {
        // $todos = Auth::user()->todos()->paginate(10);
        $todos = Auth::user()->todos;
        return response()->json($todos, 201);
    }


    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'item' => 'required|string|max:255',
        ]);

        $todo = Auth::user()->todos()->create([
            'item' => $request->item,
            'isCompleted' => false,
            'user_id' => Auth::id(),
        ]);

        return response()->json($todo, 201);
    }


    public function update(Request $request, $id): JsonResponse
    {
        $todo = Auth::user()->todos()->findOrFail($id);
        $todo->update($request->all());

        // $item->isCompleted = !$item->isCompleted ;
        // $item->save();

        return response()->json($todo);
    }


    public function destroy($id): JsonResponse
    {
        Auth::user()->todos()->findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}

