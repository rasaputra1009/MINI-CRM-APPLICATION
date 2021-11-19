<?php

namespace App\Http\Middleware;

use Closure;
use Session;
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
        sleep(1);
        $path=$request->path();
        if($path=='crm/login' && Session::get('user'))
        {
            return redirect('crm/home');
        }
        else if($path!='crm/login' && !Session::get('user'))
        {
            return redirect('crm/login');   
        }
        else{
            return $next($request);
        }
    }
}
