<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AuthMiddleWare
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $check= session()->all();
        if(!array_key_exists('user',$check))
        {
            //    return redirect('/api/crm/login');
               return redirect()->away(env('/api/crm/login'));
        }
        return $next($request);
    }
}
