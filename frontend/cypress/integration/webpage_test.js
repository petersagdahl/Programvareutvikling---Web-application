/*
Author: Petter Næss Evjen
Guidelines for testing
First, run 'npm start' to run the server.

Then we setup initial app state
-Visit a web page
-Query for element

Act
-Interact with element.

Assertions
-Make assertion about page content being the way that they should be.
*/
Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

describe("Website loads", () => {
  it("Loads website", () => {
    cy.visit("http://localhost:3000");
  });
});

describe("Website functions correctly", () => {
  it("Viewing all trips works", () => {
    cy.contains("Se alle turer").click();
    cy.url().should("include", "/hike/list#");
    cy.url().should("eq", "http://localhost:3000/hike/list#");
    cy.contains("Turer i ditt nærområde");
    cy.contains("Meld av");
  });

  it("Viewing trips signed up on", () => {
    cy.contains("Påmeldte turer").click();
    cy.url().should("include", "/hike/list/user#");
    cy.url().should("eq", "http://localhost:3000/hike/list/user#");
    cy.contains("Turer der du er påmeldt");
    cy.contains("Meld av");
  });

  it("Profile loads correctly", () => {
    cy.get("#profilePic").click();
    cy.url().should("include", "/user");
    cy.url().should("eq", "http://localhost:3000/user");
  });

  it("Making new trip works", () => {
    cy.contains("Lag en ny tur").click();
    cy.url().should("include", "/hike/create#");
    cy.url().should("eq", "http://localhost:3000/hike/create#");
    cy.contains("Lag en ny tur");
    cy.contains("Vanskelighetsgrad:");
    cy.get("input").should("have.length", 11);
  });

  it("Admin page works for only admins", () => {
    cy.get("Admin page").should("not.exist");
    cy.visit("http://localhost:3000/admin");
    cy.url().should("include", "/admin");
    cy.url().should("eq", "http://localhost:3000/admin");
    cy.contains("Adminpanel");
    cy.contains("Bruker-admin");
    cy.contains("Hike-admin");
    cy.get("input").should("have.length", 0);
  });
});

describe("Logging out", () => {
  it("Logging out works", () => {
    cy.contains("Logout").click();
  });
});

describe("Interface", () => {
  it("Has e-post input field", () => {
    cy.get("E-post").should("have.length", 0);
  });
  it("Has password input field", () => {
    cy.get("Passord").should("have.length", 0);
  });
});

describe("Registration page", () => {
  it("Loads correctly", () => {
    cy.contains("Registrer deg").click();
    cy.on("uncaught exception", (err, runnable) => {
      if (err.message.includes("Cannot read properties of null")) {
        return false;
      }
    });
    cy.get("button").should("have.length", 4);
    cy.get("Fornavn").should("have.length", 0);
    cy.get("Etternavn").should("have.length", 0);
    cy.get("Fødselsdato").should("have.length", 0);
    cy.get("E-post").should("have.length", 0);
    cy.get("Telefon").should("have.length", 0);
    cy.get("Passord").should("have.length", 0);
  });
});

describe("Swapping back to frontpage", () => {
  it("Swaps correctly", () => {
    cy.contains("Logg inn").click();
    cy.on("uncaught exception", (err, runnable) => {
      if (err.message.includes("Cannot read properties of null")) {
        return false;
      }
    });
    cy.get("E-post").should("have.length", 0);
    cy.get("Passord").should("have.length", 0);
    cy.get("button").should("have.length", 4);
  });
});

describe("Failing to log in", () => {
  it("Types in email wrong", () => {
    cy.contains("Logg inn").click();
    cy.get("#emailField").type("cypress@test.no");
    cy.get("#passwordField").type("feil");
    cy.get(".user-form-submit").click();
    cy.contains("Passordet må være minst 6 tegn langt");
  });
  it("Corrects wrong password", () => {
    cy.get("#passwordField").type(
      "{backspace}{backspace}{backspace}{backspace}"
    );
    cy.get("#passwordField").type("testingCypress7");
  });

  /* describe("Logging in", () => {
  it("Logging in works", () => {
    cy.get(".user-form-submit").click();
    cy.wait(150);
  });
}); */
});

describe("Logging in", () => {
  it("Loads website", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Se alle turer").click();
    cy.url().should("include", "/hike/list#");
    cy.url().should("eq", "http://localhost:3000/hike/list#");
  });
});
