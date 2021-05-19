@BDDSTORY-DST-1
Feature: Serve coffee
As a coffee loverI can get coffee from the machineSo I can enjoy the rest of the day

  Background:
    Given the coffee machine is started
    And I handle everything except the water tank

  @BDDTEST-DST-2
  Scenario: Message "Fill water tank" is displayed after 50 coffees are taken
    Given the coffee machine is started
    When I take a coffee
    Then coffee should be served

  @BDDTEST-DST-3
  Scenario: It is possible to take 10 coffees after the message "Fill water tank" is displayed
    

  @BDDTEST-DST-4
  Scenario: When the water tank is filled, the message disappears
    
