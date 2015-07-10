module ApplicationHelper
  def timeStringHHMMSS(time)
    if time > 3600
      Time.at(time).utc.strftime("%H:%M:%S")
    else
      Time.at(time).utc.strftime("%M:%S")
    end
  end
end
