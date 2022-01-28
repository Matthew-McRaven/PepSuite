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

emscripten::val get_macro(registry& reg, std::string name) {
    auto v = reg.find(name);
    if(v.has_value()) return emscripten::val(*v);
    else return emscripten::val::undefined();
}

EMSCRIPTEN_BINDINGS(pep10) {

    emscripten::function("lerp", &lerp);
    // Needed for figure, ls-figures.
    emscripten::class_<figure>("Figure")
        .property("processor", &figure::proc)
        .property("chapter", &figure::chapter)
        .property("figure", &figure::fig);
    emscripten::class_<std::optional<figure>>("Optional<Figure>");
    emscripten::class_<std::vector<figure>>("FigureVector")
        .constructor()
        .function("size", emscripten::select_overload<size_t(void) const>(&std::vector<figure>::size))
        .function("get", emscripten::select_overload<const figure&(size_t)const>(&std::vector<figure>::at));
    // Needed for macro, ls-macros.
    emscripten::class_<macro>("Macro")
        .property("name", &macro::name)
        .property("text", &macro::text);
    emscripten::class_<std::vector<macro>>("MacroVector")
        .constructor()
        .function("size", emscripten::select_overload<size_t(void) const>(&std::vector<macro>::size))
        .function("get", emscripten::select_overload<const macro&(size_t)const>(&std::vector<macro>::at));
    // Registry for macro/figure commands.
    emscripten::class_<registry>("Registry")
        .constructor(&registry::instance)
        .function("findMacro", get_macro)
        .function("findFigure", emscripten::select_overload<std::optional<figure>(std::string, uint16_t, std::string) const>(&registry::find))
        .function("figures", &registry::figures)
        .function("macros", &registry::macros);
}