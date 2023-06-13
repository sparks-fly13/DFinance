import Debug "mo:base/Debug";
import Nat "mo:base/Nat";
import Time "mo:base/Time";
import Int "mo:base/Int";
import Float "mo:base/Float";

actor DFinance {
  stable var currentValue: Float = 300;
  stable var startTime = Time.now();
  let id = 239012023932;

  public func topUp(amount: Float) {
    currentValue += amount;
    Debug.print(debug_show(currentValue));
  };

  public func withdraw(amount: Float) {
    let temp: Float = currentValue - amount;

    if(temp >= 0){
      currentValue -= amount;
      Debug.print(debug_show(currentValue));
    }
    else {
      Debug.print("Amount too large to be subtracted from the given amount.");
    }
  };

  public query func checkBalance(): async Float {
    return currentValue;
  };

  public func compound() {
    let currentTime = Time.now();
    let timeElapsed = (currentTime - startTime)/(10**9);
    currentValue := currentValue * (1.01 ** Float.fromInt(timeElapsed));
    startTime := currentTime;
  };
}
