from django.shortcuts import render

def front(request):
    context = {"a":1 }
    return render(request, "index.html", context)
