

#include <catch.hpp>

#include "ex_registry.hpp"

TEST_CASE("Figures Present") {

    SECTION("Sample figure") {
        auto fig = registry::instance().find("pep10", 5, "03");
        CHECK(fig);
    }
}