@BDDSTORY-DST-1
Feature: Serve coffee
As a coffee lover I can get coffee from the machineSo I can enjoy the rest of the day

  Background:
    Given the coffee machine is started
    And I handle everything except the water tank

  @BDDTEST-DST-2
  Scenario: Message "Fill water tank" is displayed after 50 coffees are taken
    Given the coffee machine has been used 50 times
    When I take a coffee
    Then coffee should be served