#include "pep10.hpp"
#include "ex_registry.hpp"
#include "asmb/pep10/highlight.hpp"

#include <emscripten.h>
#include <iostream>

pep10::wrapped_isa_definition::wrapped_isa_definition() {}

emscripten::val get_macro(registry& reg, std::string name) {
    auto v = reg.find(name);
    if(v.has_value()) return emscripten::val(*v);
    else return emscripten::val::undefined();
}

emscripten::val get_figure(registry& reg, std::string proc, uint16_t chapter, std::string fig) {
    auto v = reg.find(proc, chapter, fig);
    if(v.has_value()) return emscripten::val(*v);
    else return emscripten::val::undefined();
}

EMSCRIPTEN_BINDINGS(pep10) {

    emscripten::enum_<element_type>("ElementType")
        .value("Pep", element_type::kPep);
    emscripten::register_map<element_type, std::string>("FigureElement");
    // Needed for figure, ls-figures.
    emscripten::class_<figure>("Figure")
        .property("processor", &figure::proc)
        .property("chapter", &figure::chapter)
        .property("figure", &figure::fig)
        .property("elements", &figure::elements);
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
        .function("findFigure", get_figure)
        .function("figures", &registry::figures)
        .function("macros", &registry::macros);
}