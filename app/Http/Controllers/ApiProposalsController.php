<?php

namespace App\Http\Controllers;


use App\Presenters\ApiPresenter;
use App\Proposal;
use Auth;
use Illuminate\Http\Request;

use App\Http\Requests;

class ApiProposalsController extends Controller
{
    /**
     * Выборка всех заявок
     * @return mixed
     */
    public function getProposals()
    {
        $proposals = Proposal::with('user')->get()->present(ApiPresenter::class);

        return response()->json($proposals);
    }

    /**
     * Новая заявка
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function newProposal(Request $request)
    {
        $proposal = new Proposal([
            'name'     => $request->input('name'),
            'phone'    => $request->input('phone'),
            'from'     => $request->input('from'),
            'to'       => $request->input('to'),
            'count'    => $request->input('count'),
            'baggage'  => $request->input('baggage'),
            'finished' => $request->input('finished'),
        ]);
        Auth::user()->proposals()->save($proposal);
        $proposalWithUser = Proposal::where('id', $proposal->id)->with('user')->get()->present(ApiPresenter::class);

        return response()->json($proposalWithUser);
    }

    /**
     * Удаление заявки
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function deleteProposal(Request $request, $id)
    {
        $proposal = Proposal::find($id)->delete();

        return response()->json();
    }

    /**
     * Завершение заявки
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function finishProposal(Request $request, $id)
    {
        $proposal = Proposal::find($id);
        $proposal->finished = true;
        $proposal->save();

        $proposalWithUser = Proposal::where('id', $proposal->id)->with('user')->get()->present(ApiPresenter::class);

        return response()->json($proposalWithUser);
    }
}
