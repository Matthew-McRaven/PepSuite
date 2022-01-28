#include "pep10.hpp"
#include "ex_registry.hpp"
#include "asmb/pep10/highlight.hpp"

#include <emscripten.h>
#include <iostream>

pep10::wrapped_isa_definition::wrapped_isa_definition() {}

float lerp(float a, float b, float t)
{
    return (1-t)*a+t*b;
}

EMSCRIPTEN_BINDINGS(pep10) {

    emscripten::function("lerp", &lerp);
    emscripten::class_<figure>("Figure")
        .property("processor", &figure::proc)
        .property("chapter", &figure::chapter)
        .property("figure", &figure::fig);
    emscripten::class_<std::optional<figure>>("optionalFigure");
    emscripten::class_<std::vector<figure>>("FigureVector")
        .constructor()
        .function("size", emscripten::select_overload<size_t(void) const>(&std::vector<figure>::size))
        .function("get", emscripten::select_overload<const figure&(size_t)const>(&std::vector<figure>::at));
    emscripten::class_<registry>("Registry")
        .constructor(&registry::instance)
        .function("find", emscripten::select_overload<std::optional<figure>(std::string, uint16_t, std::string) const>(&registry::find))
        .function("figures", &registry::figures);
}